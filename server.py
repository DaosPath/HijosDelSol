import http.server
import socketserver

PORT = 8000
DIRECTORY = "."

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

handler_object = MyHttpRequestHandler

with socketserver.TCPServer(("", PORT), handler_object) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
