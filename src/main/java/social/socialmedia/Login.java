package social.socialmedia;

public class Login {
    private String studentname;
    private String password;

   public Login(String studentname, String password) {
        this.studentname = studentname;
        this.password = password;
    }

    public Login(){
    }
    

    public String getStudentname() {
        return studentname;
    }
    public void setStudentname(String studentname) {
        this.studentname = studentname;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

