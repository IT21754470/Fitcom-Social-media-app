package social.socialmedia;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface SRepo extends MongoRepository<Social, String> {
    Social findByStudentname(String studentname);

    List<Social> findFollowedUsersBy_id(String _id);

    @Query("{'followers.userId': ?0}")
    List<Social> findFollowersByUserId(String userId); // Define the method signature

  
}
