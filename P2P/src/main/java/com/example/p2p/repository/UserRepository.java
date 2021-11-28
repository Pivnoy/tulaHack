package com.example.p2p.repository;

import com.example.p2p.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u  where u.login = ?1")
    User getByLogin(String login);

    @Query("SELECT new java.lang.Boolean(COUNT(*) > 0) FROM User u where u.login = ?1")
    Boolean existsByLogin(String login);

}
