package BNA.wallet.user;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;  // Assuming you have a User entity and repository

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Login endpoint (simple login check without Keycloak integration)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> user = userRepository.findByUsername(request.getUsername());
        if (user.isPresent() && passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            return ResponseEntity.ok(Map.of("message", "Login Successful"));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }

    // Signup endpoint (ensure valid JSON response)
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already exists"));
        }
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(newUser);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    // Forgot password endpoint (ensure JSON response)
    @Autowired
    private EmailService emailService;


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        System.out.println("Requête reçue pour réinitialisation de mot de passe : " + request.getEmail());

        Optional<User> user = userRepository.findByEmail(request.getEmail());
        if (user.isPresent()) {
            try {
                String resetToken = UUID.randomUUID().toString(); // Générer un token aléatoire
                user.get().setResetToken(resetToken); // Stocker le token
                userRepository.save(user.get()); // Sauvegarder l'utilisateur mis à jour
                System.out.println("Token généré : " + resetToken);

                emailService.sendResetPasswordEmail(request.getEmail(), resetToken);
                return ResponseEntity.ok(Map.of("message", "Password reset link sent to your email"));
            } catch (Exception e) {
                e.printStackTrace(); // Afficher l'erreur dans les logs
                return ResponseEntity.status(500).body(Map.of("error", "Erreur lors de l'envoi de l'email"));
            }
        }

        return ResponseEntity.badRequest().body(Map.of("error", "Email not found"));
    }



}
