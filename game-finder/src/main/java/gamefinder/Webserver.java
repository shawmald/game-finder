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
    private ProfilesManagement profiles = null;

    public Webserver(int port, MongoClient mongoClient) throws IOException{
        Webserver.mongoClient = mongoClient;
        this.port = port;
        this.server = HttpServer.create( new InetSocketAddress(this.port), 0);
        this.profiles = new ProfilesManagement(mongoClient);   //Need for this to take in mongoclient as a parameter

        this.server.createContext("/PingCheck", new IndexHandler() );
        this.server.createContext("/SignUp", new SignUp(profiles) );
        this.server.createContext("/Login", new Login(profiles) );

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

class GetUserNames implements HttpHandler { 

    public void handle(HttpExchange t) throws IOException {
        String response = "Response!";
        t.sendResponseHeaders(200, response.length());
        t.getResponseBody().write(response.getBytes());
        t.getResponseBody().close();
    }
}


class SignUp implements HttpHandler {

    private ProfilesManagement profiles;

    public SignUp(ProfilesManagement setProfiles){
        this.profiles = setProfiles;
    }

    public void handle(HttpExchange t) throws IOException {

        Map<String, String> params = Webserver.queryToMap(t.getRequestURI().getQuery());
        String displayName = params.get("DisplayName");
        String username = params.get("Username");
        String password = params.get("Password");

        String response = profiles.signUp(displayName, username, password);
        t.sendResponseHeaders(200, response.length());
        t.getResponseBody().write(response.getBytes());
        t.getResponseBody().close();
    }
}


class Login implements HttpHandler {

    private ProfilesManagement profiles;

    public Login(ProfilesManagement setProfiles){
        this.profiles = setProfiles;
    }

    public void handle(HttpExchange t) throws IOException {

        Map<String, String> params = Webserver.queryToMap(t.getRequestURI().getQuery());
        String username = params.get("Username");
        String password = params.get("Password");


        String response = profiles.login(username, password);
        t.sendResponseHeaders(200, response.length());
        t.getResponseBody().write(response.getBytes());
        t.getResponseBody().close();
    }
}


