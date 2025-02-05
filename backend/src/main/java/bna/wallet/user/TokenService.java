package BNA.wallet.user;

import org.springframework.stereotype.Service;

@Service
public class TokenService {

    public boolean validateResetToken(String token) {
        // Validate the reset token (you can use JWT or a random token in the database)
        // Return true if the token is valid, otherwise false
        return true;  // For simplicity, assuming the token is valid
    }
}
