package gamefinder;


import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.mongodb.MongoClient;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Webserver {

    private int port;
    private HttpServer server;
    public static MongoClient mongoClient = null;
    //private UserList users = null;

    public Webserver(int port, MongoClient mongoClient) throws IOException{
        Webserver.mongoClient = mongoClient;
        this.port = port;
        this.server = HttpServer.create( new InetSocketAddress(this.port), 0);
        //this.users = new UserList(mongoClient);

        this.server.createContext("/PingCheck", new IndexHandler() );

        this.server.start();
    }

    /**
    * This is for query from the frontend so they know the information to send
    * to complete the context that they want completed.
    * @param query
    * @return
    */
    public static Map<String, String> queryToMap(String query) {
        if(query == null) {
            return null;
        }
        Map<String, String> result = new HashMap<>();
        for (String param : query.split("&")) {
            String[] entry = param.split("=");
            if (entry.length > 1) {
                result.put(entry[0], entry[1]);
            }else{
                result.put(entry[0], "");
            }
        }

        return result;
    }
}

class IndexHandler implements HttpHandler {
    public void handle(HttpExchange t) throws IOException {
        String response = "Response!";
        t.sendResponseHeaders(200, response.length());
        t.getResponseBody().write(response.getBytes());
        t.getResponseBody().close();
    }
  }
