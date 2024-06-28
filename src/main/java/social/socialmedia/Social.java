package social.socialmedia;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="socialmedia")
public class Social {
    @Id
    public String _id;
    public String studentname;
    public String email;
    public String mobile;
    public String password;
    public String confirmPassword;
    public String bio;
    public String profilePicture;
     private Set<Social> followedUsers;
    public Social(String _id, String studentname, String email, String mobile, String password, String confirmPassword, String profilePicture, String bio) {
        this._id = _id;
        this.studentname = studentname;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.profilePicture = profilePicture;
        this.bio = bio;
    }
    public Social(){
    }
        public String getId() {
            return _id;
        }

        public void setId(String _id) {
            this._id = _id;
        }

        public String getStudentname() {
            return studentname;
        }
        public void setStudentname(String studentname) {
            this.studentname = studentname;
        }
        public String getemail() {
            return email;
        }
        public void setemail(String email) {
            this.email = email;
        }
        public void setMobile(String mobile) {
            this.mobile = mobile;
        }
        public String getMobile() {
            return mobile;
        }

        public String getPassword() {
            return password;
        }
    
        public void setPassword(String password) {
            this.password = password;
        }
    
        public String getConfirmPassword() {
            return confirmPassword;
        }
    
        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }

        public String getBio() {
            return bio;
        }
        public void setBio(String bio) {
            this.bio = bio;
        }

        public String getProfilePicture() {
            return profilePicture;
        }
        public void setProfilePicture(String profilePicture) {
            this.profilePicture = profilePicture;
        }
    }
