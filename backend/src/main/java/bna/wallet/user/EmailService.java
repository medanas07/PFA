package BNA.wallet.user;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendResetPasswordEmail(String toEmail, String resetToken) throws MessagingException {
        String resetLink = "http://localhost:4200/reset-password?token=" + resetToken; // Lien vers la page de réinitialisation du mot de passe

        // Create a MimeMessage for HTML content
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);  // 'true' for multipart message (HTML)

        helper.setTo(toEmail);
        helper.setSubject("Réinitialisation de votre mot de passe");

        // HTML content for email
        String htmlContent = "<p>Bonjour,</p>" +
                "<p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous :</p>" +
                "<p><a href='" + resetLink + "'>Réinitialiser mon mot de passe</a></p>";

        // Manually set the content type to text/html
        message.setContent(htmlContent, "text/html; charset=UTF-8");

        // Logging for debugging
        System.out.println("Sending reset password email to: " + toEmail);
        System.out.println("Reset link: " + resetLink);

        mailSender.send(message);
    }
}
