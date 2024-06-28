package social.socialmedia;


import java.util.List;
import java.util.Map;

//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("api/v1/socialmedia")

public class Scontroller {

    private static final int List = 0;
    @Autowired

    private Sservice sservices;
    @Autowired

    private PasswordEncoder passwordEncoder;
    @PostMapping(value="/save")
    private ResponseEntity<String> saveSocial(@RequestBody Social socials) {
        
        if (!socials.getPassword().equals(socials.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Password and confirm password do not match.");
        }

String encryptedPassword = passwordEncoder.encode(socials.getPassword());
        socials.setPassword(encryptedPassword);
   sservices .saveorUpdate(socials);
   return ResponseEntity.ok(socials.getId());
    }

   
    @GetMapping("/getAll")
    @PreAuthorize("isAuthenticated()")
    public Iterable<Social> getAllSocial() {
        return sservices.listAll();
    }


@GetMapping("/oauth/success") 
public ResponseEntity<String> oauthSuccess() {
    return ResponseEntity.ok("OAuth Login successful."); 
}

@PutMapping("/profile/{id}")
@PreAuthorize("isAuthenticated()") 
public ResponseEntity<Social> updateProfile(
    @PathVariable(name = "id") String studentId,
    @RequestBody Social socialData
) {
    Social existingSocial = sservices.getSocialByID(studentId);
    if (existingSocial == null) {
        return ResponseEntity.notFound().build(); 
    }

    // Update the profile with new data
    existingSocial.setStudentname(socialData.getStudentname());
    existingSocial.setemail(socialData.getemail());
    existingSocial.setMobile(socialData.getMobile());
    existingSocial.setBio(socialData.getBio());
    existingSocial.setProfilePicture(socialData.getProfilePicture());

    sservices.saveorUpdate(existingSocial); 

    return ResponseEntity.ok(existingSocial); // Return the updated profile data
}

   @DeleteMapping("/delete/{id}")
   public void delete(@PathVariable("id") String _id) {
       sservices.delete(_id);
   }

   @RequestMapping("/social/{id}")
   private Social getSocial(@PathVariable(name="id") String studentId) {
       return sservices.getSocialByID(studentId);
   }
   
   @PostMapping(value="/login")
   public ResponseEntity<String> login(@RequestBody Social loginData) {
       Social social = sservices.getSocialByStudentname(loginData.getStudentname());
       
       if (social == null) {
           System.out.println("User not found: " + loginData.getStudentname());
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid studentname.");
       }
   
       System.out.println("Entered password: " + loginData.getPassword());
       System.out.println("Retrieved hashed password from database: " + social.getPassword());
   
       if (!passwordEncoder.matches(loginData.getPassword(), social.getPassword())) {
           System.out.println("Password mismatch for user: " + loginData.getStudentname());
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password.");
       }
 
       System.out.println("User logged in:");
       System.out.println("Student Name: " + social.getStudentname());
       System.out.println("Student email: " + social.getemail());
       System.out.println("Mobile: " + social.getMobile());
   
   
       return ResponseEntity.ok(social.getId());
   }
   
   
   @GetMapping(value="/profile/{studentId}")
   public ResponseEntity<Social> getProfile(@PathVariable(name="studentId") String studentId) {
       Social social = sservices.getSocialByID(studentId);
       if (social == null) {
           return ResponseEntity.notFound().build();
       }
       return ResponseEntity.ok(social);
   }
   
   
   
  @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        try {
            // Perform logout logic here
            // For example, clearing security context
            SecurityContextHolder.clearContext();
            return ResponseEntity.ok("Logged out successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error logging out.");
        }
    }
  
    @PostMapping("/google-login")
    public ResponseEntity<String> googleLogin(@RequestBody Map<String, String> payload) {
        String tokenId = payload.get("tokenId");
        // Here, you would verify the token with a service like Firebase Authentication
        if (tokenId != null) {
            // Simulate successful verification
            return ResponseEntity.ok("Google login successful.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Google login failed.");
        }
    }

    @PostMapping("/follow/{userId}")
    public ResponseEntity<String> followUser(@PathVariable("userId") String userId) {
        // Add logic to follow the user with the given ID
        // For example, update the database to establish the follow relationship
    
        return ResponseEntity.ok("You are now following the user with ID: " + userId);
    }
    

 @GetMapping("/getFollowedUsers")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Social>> getFollowedUsers() {
        // Fetch followed users for the authenticated user from the service
        List<Social> followedUsers = sservices.getFollowedUsers(null);
        return ResponseEntity.ok(followedUsers);
    }

@PostMapping("/unfollow/{userId}")
public ResponseEntity<String> unfollowUser(@PathVariable("userId") String userId) {
    // Add logic to unfollow the user with the given ID
    // For example, update the database to remove the follow relationship
    return ResponseEntity.ok("You have unfollowed the user with ID: " + userId);
}

}