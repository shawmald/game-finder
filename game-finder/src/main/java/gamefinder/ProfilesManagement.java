package gamefinder;
/**
 * 
 * @Author: Andrew Skevington-Olivera
 * @Date: 16-4-23
 */


import java.util.ArrayList;

import org.bson.Document;
 
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;

/**
 * Profiles[]
 * getProfiles()
 * checkLogin()
 * returnProfileUsernames()
 * signUp()
 * addProfiles()
 * removeProfile()
 * accessUser()
 * returnProfiles[] ()
 * 
 * 
 */

public class ProfilesManagement {

    private ArrayList<Profile> profiles = new ArrayList<>();
    private GetDbCollection mongoDB = new GetDbCollection();
    private MongoClient mongoClient = null;
    private MongoCollection<Document> profileCollection = mongoDB.returnCollection("ProfilesDB", "Profiles", this.mongoClient);;

    ProfilesManagement( MongoClient mongoClient ){

        this.mongoClient = mongoClient;
        //this.profileCollection = mongoDB.returnCollection("ProfilesDB", "Profiles", this.mongoClient);

        for(Document doc : profileCollection.find() ){
            String username = doc.getString("Username");
            String pw = doc.getString("Password");
            addProfile( new Profile(username, pw, this.mongoClient) );
        }


    }


    public String signUp(String displayName, String username, String pw){

        for(Document doc : profileCollection.find() ){
            if( username.compareTo( doc.getString("Username") ) == 0) {
                return "False";     //False means that the username is already taken
            }
        }

        Profile newProfile = new Profile(displayName, username, pw, this.mongoClient);
        addProfile( newProfile );

        return "True";  //True means that the new profile was created and there wasn't the same username.
        
    }

    public String login(String username, String pw){

        for(Document doc : profileCollection.find() ) {
            if( (username.compareTo( doc.getString("Username") ) == 0) && (pw.compareTo( doc.getString("Password") ) == 0) ) {
                return "True";  //The login information was correct
            }
        }

        return "False";     //The login information wasn't correct
    }

    void addProfile(Profile profile){
        profiles.add(profile);
    }

    public Profile accessProfile(String username) { //Change the username to token for later

        for(Profile profile : this.profiles){
            if( username.compareTo( profile.getUsername() ) == 0){
                return profile;
            }
        }

        return null;
    }

    public ArrayList<Profile> returnProfiles(){
        return profiles;
    }


    
}
