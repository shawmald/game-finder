package gamefinder;
/** 
 * 
 * @Author: Andrew Skevington-Olivera
 * @Date 16-4-23
*/





import java.util.ArrayList;
import java.util.Base64;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Updates;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.awt.*;

/**
 * Character Sheet[5]
 * Char Folder[], includes character sheet, description, spells
 * convTimeZones()
 * timeZones()
 * settimeAvailable()
 * getTimeAvailable()
 * setBlockedUsers()
 * getBlockedUsers()
 * private token
 * str username
 * str password
 * str displayName
 * Theme()
 * int privacyLvl
 * bool GM/User
 * 
 * 
 */
public class Profile {
    
    private String username, password, displayName, blockedProfiles, friends, token;
    private int permissionLevel = 0;    //This is just 0 or 1, 0 for regular players and 1 for gm's
    private CharSheet[] characterSheets;
    private GetDbCollection mongoDB = new GetDbCollection();
    private MongoClient mongoClient = null;
    private MongoCollection<Document> profileCollection = mongoDB.returnCollection("ProfilesDB", "Profiles", this.mongoClient);


    /**
     * This'll be the profile that's created when users are first signing up.
     */
    public Profile(String displayName, String username, String password, MongoClient mongoClient){
        this.displayName = displayName;
        this.username = username;
        this.password = password;
        this.mongoClient = mongoClient;

        //When creating new profile for now, a token won't be set but later it should be set
        //for better security from hackers for login / signup info
        saveToDB();
    }


    /**
     * This'll be the profile that's created when users are signing in.
     */
    public Profile(String username, String password, MongoClient mongoClient){
        this.mongoClient = mongoClient;
        this.username = username;
        getUserDBInfo();
    }


    /**
     * This saves all of the profile informatiion to a database to be stored and accessed for later.
     */
    void saveToDB(){

        Document doc = new Document("Username", this.username).append("Password", this.password).append("Display Name", this.displayName)
        .append("Character Sheets", this.characterSheets);
        profileCollection.insertOne(doc);
    }

    /**
     * This sets all of the parameters from the database to the ones inside of the classes.
     */
    void getUserDBInfo(){

        for(Document doc : profileCollection.find() ){
            if( this.username.compareTo( doc.getString("Username") ) == 0){
                this.displayName = doc.getString("Display Name");
                this.password = doc.getString("Password");
            }
        }
    }




    String getUsername(){
        return this.username;
    }

    String getPW(){
        return this.password;
    }

    String returnDisplayName(){
        return this.displayName;
    }

}
