mqtt = require('mqtt')

topic = '/status/smart-lamp'
status = 'off'

mqttModel = mqtt.publish(topic, status)

module.exports = mqttModel