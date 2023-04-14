package gamefinder;
/**
 * 
 */

import java.io.IOException;

import javax.script.ScriptException;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public final class App {
    public static void main(String[] args) throws ScriptException, IOException{
        
        MongoClientURI uri = new MongoClientURI("mongodb+srv://gamefinder.2rj5gki.mongodb.net/myFirstDatabas");
        MongoClient mongoClient = new MongoClient(uri);

        Webserver server = new Webserver(90, mongoClient);
    }
}
