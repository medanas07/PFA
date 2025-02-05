package BNA.wallet.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void resetPassword(String token, String newPassword) {
        // Retrieve the user from the database by token or email (you can implement token verification here)
        User user = userRepository.findByResetToken(token);
        if (user != null) {
            // Update the password
            user.setPassword(newPassword);  // You should hash the password before saving it
            userRepository.save(user);
        }
    }
}
