package social.socialmedia;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Sservice {
    @Autowired
    private SRepo srepo;

    public void saveorUpdate(Social socials) {
        srepo.save(socials);
    }

    public Iterable<Social> listAll() {
        return srepo.findAll();
    }

    public void delete(String id) {
        srepo.deleteById(id);
    }

    public Social getSocialByID(String studentId) {
        return srepo.findById(studentId).orElse(null);
    }

    public Social getSocialByStudentname(String studentname) {
        return srepo.findByStudentname(studentname);
    }
   

    public boolean isFollowing(String currentUserId, String userId) {
        // TODO: Implement logic to check if currentUserId is following userId
        // This method will return true if currentUserId is following userId, otherwise false
        throw new UnsupportedOperationException("Unimplemented method 'isFollowing'");
    }
    
    public List<Social> getFollowedUsers(String userId) {
        // Implement logic to fetch followed users based on the provided user ID
        // For example, you might query the database to retrieve the list of followers for the specified user ID

        // Assuming you have a field in the Social entity to store followers and it's called followers,
        // you can use a custom query to fetch the users who are followed by the specified user ID
        return srepo.findFollowersByUserId(userId);
    }

    public void followUser(String currentUserId, String userId) {
        // Implement logic to establish the follow relationship between the current user and the user with the given ID
        // For example, update the database to record the follow relationship
        // You may need to modify your Social entity to include a list of followers or a separate entity to represent the follow relationship
        // Once the relationship is established, save the changes to the database
    }
}
