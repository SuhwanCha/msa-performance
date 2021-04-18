import py_eureka_client.eureka_client as eureka_client
from flask import Flask

your_rest_server_port = 5000
# The flowing code will register your server to eureka server and also start to send heartbeat every 30 seconds
eureka_client.init(eureka_server="http://192.168.0.107:8761/eureka",
                   app_name="flask_example",
                   instance_port=your_rest_server_port)

app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"


if __name__ == '__main__':
    app.run()
