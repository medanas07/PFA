package BNA.wallet.Wallet;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WalletRepository extends JpaRepository<Wallet, UUID> {


    List<Wallet> findAllById(UUID id);
    List<Wallet> findAllByBalance(double balance);
    List<Wallet> findAllByUserId(String userId);
    Optional<Wallet> findByUserId(String userId);

    @Query("SELECT w FROM Wallet w WHERE FUNCTION('DATE', w.createdAt) = :createdAt")
    List<Wallet> findAllByCreatedAt(Date createdAt);

    @Query("SELECT w FROM Wallet w WHERE FUNCTION('DATE', w.createdAt) < :createdAt")
    List<Wallet> findAllByCreatedAtBefore(Date createdAt);

    @Query("SELECT w FROM Wallet w WHERE FUNCTION('DATE', w.createdAt) between :createdAtAfter and  :createdAtBefore")
    List<Wallet> findAllByCreatedAtBetween(@Param("createdAtAfter") Date createdAtAfter,
                                           @Param("createdAtBefore") Date createdAtBefore);

    @Query("SELECT w FROM Wallet w WHERE FUNCTION('DATE', w.createdAt) > :createdAtAfter")
    List<Wallet> findAllByCreatedAtAfter(  @Param("createdAtAfter")Date createdAtAfter);
    @Transactional
    void deleteWalletById(UUID id);
}
