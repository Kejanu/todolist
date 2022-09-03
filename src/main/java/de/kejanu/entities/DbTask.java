package de.kejanu.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity(name = "Task")
public class DbTask extends PanacheEntityBase {

    @Id
    @GeneratedValue
    @Column( name = "id" )
    public UUID id;

    @Column(name = "title")
    public String title;

    @Column(name = "content")
    public String content;

    @Column(name = "status")
    @Enumerated( EnumType.STRING)
    public TaskStatus taskStatus;

    @Column(name = "created_at")
    public Instant createdAt;

    @Column(name = "modified_at")
    public Instant modifiedAt;

    @PrePersist
    void prePersist() {
        createdAt = Instant.now();
    }

    @PreUpdate
    void preUpdate() {
        modifiedAt = Instant.now();
    }
}
