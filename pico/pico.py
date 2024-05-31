import network
import time
import machine
from umqtt.simple import MQTTClient

# Define constants (replace with your actual values)
SSID = ''
PASSWORD = ''
MQTT_SERVER = '10.0.0.77'
MQTT_PORT = 1883
CLIENT_ID = 'manda'
MQTT_USER = ''
MQTT_PASSWORD = ''
TOPIC_SUB = b'weather/lighting'

# Define LED pins
LED_R_PIN = 28
LED_G_PIN = 27
LED_B_PIN = 26

led_r = machine.PWM(machine.Pin(LED_R_PIN))
led_g = machine.PWM(machine.Pin(LED_G_PIN))
led_b = machine.PWM(machine.Pin(LED_B_PIN))

# Set PWM frequency
led_r.freq(1000)
led_g.freq(1000)
led_b.freq(1000)

def set_weather_leds(condition):
    print(f"Setting LEDs for condition: {condition}")
    if condition == "Clear":
     led_r.duty_u16(65535)  # Bright Red
     led_g.duty_u16(0)      # No Green
     led_b.duty_u16(65535)  # Bright Blue

    elif condition == "Partly Cloudy":
        led_r.duty_u16(32768)  # Mid Red
        led_g.duty_u16(32768)  # Bright Green
        led_b.duty_u16(32768)  # Mid Blue
    elif condition == "Overcast":
        led_r.duty_u16(0)  # Bright Red
        led_g.duty_u16(65535)  # Bright Green
        led_b.duty_u16(0)  # Bright Blue
    elif condition == "Rain":
        led_r.duty_u16(0)
        led_g.duty_u16(0)
        led_b.duty_u16(65535)  # Bright Blue
    elif condition == "Thunderstorm":
        led_r.duty_u16(0)      # No Red
        led_g.duty_u16(65535)  # Bright Green
        led_b.duty_u16(65535)  # Bright Blue

    elif condition == "Snow":
        led_r.duty_u16(65535)  # Bright White
        led_g.duty_u16(32768)
        led_b.duty_u16(65535)
    elif condition == "Fog":
        led_r.duty_u16(32768)  # Mid Rred
        led_g.duty_u16(32768)
        led_b.duty_u16(65535)  # Bright Blue
    else:
        led_r.duty_u16(65535)
        led_g.duty_u16(65535)
        led_b.duty_u16(65535)

def sub_cb(topic, msg):
    print(f"Message received: Topic={topic}, Message={msg}")
    condition = msg.decode('utf-8').strip()
    print(f"Decoded condition: {condition}")
    set_weather_leds(condition)

def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(SSID, PASSWORD)
    max_attempts = 10
    attempt = 0
    while not wlan.isconnected() and attempt < max_attempts:
        print("Waiting for Wi-Fi connection...")
        attempt += 1
        time.sleep(1)
    if wlan.isconnected():
        print('Connected to Wi-Fi:', wlan.ifconfig())
        return True
    else:
        print("Failed to connect to Wi-Fi after multiple attempts.")
        return False

def connect_mqtt():
    print(f"Connecting to MQTT broker at {MQTT_SERVER}...")
    client = MQTTClient(CLIENT_ID, MQTT_SERVER, port=MQTT_PORT, user=MQTT_USER, password=MQTT_PASSWORD)
    client.set_callback(sub_cb)

    try:
        client.connect()
        client.subscribe(TOPIC_SUB)
        print('Connected to %s MQTT broker' % MQTT_SERVER)
        return client
    except Exception as e:
        print(f"Failed to connect to MQTT broker: {e}")
        return None

def main():
    print("Starting main function...")
    if connect_wifi():
        print("Wi-Fi connected, proceeding to MQTT...")
        client = connect_mqtt()
        if client:
            print("MQTT connected, entering main loop...")
            try:
                while True:
                    client.check_msg()
                    time.sleep(1)
            except Exception as e:
                print(f"Exception in main loop: {e}")
            finally:
                client.disconnect()
        else:
            print("MQTT connection failed. Check the MQTT broker address and network settings.")
    else:
        print("Wi-Fi connection failed. Cannot proceed to MQTT.")

if __name__ == '__main__':
    main()



