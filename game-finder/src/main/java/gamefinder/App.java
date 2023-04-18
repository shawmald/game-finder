package gamefinder;
/**
 * 
 */

import java.io.IOException;
import java.util.ArrayList;

import javax.script.ScriptException;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public final class App {
    public static void main(String[] args) throws ScriptException, IOException{
        
        //MongoClientURI uri = new MongoClientURI("mongodb+srv://gamefinder.2rj5gki.mongodb.net/myFirstDatabas");
        MongoClientURI uri = new MongoClientURI("mongodb+srv://gameFinder:ASUq%23%2AAIwq%29@gamefinder.2rj5gki.mongodb.net/?retryWrites=true&w=majority");
        MongoClient mongoClient = new MongoClient(uri);

        Webserver server = new Webserver(90, mongoClient);
    }
}
