package io.apicurio.hub.api.codegen;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.file.Paths;

public class CloneRepository {
    private static final Logger log = LoggerFactory.getLogger(CloneRepository.class);

    private final String repoUri;
    private final String fileDirectory;


    public CloneRepository(String repoUri, String fileDirectory) {
        this.repoUri = repoUri;
        this.fileDirectory = fileDirectory;
    }

    public void call() {
        try (Git git = Git.cloneRepository()
                .setURI(repoUri)
                .setDirectory(Paths.get(fileDirectory).toFile())
                .call()) {
            log.debug("Successfully cloned repository {} to directory {}", repoUri, fileDirectory);
        } catch (GitAPIException e) {
            log.error("Failed when clone git project {} to directory {}", repoUri, fileDirectory, e);
        }
    }
}
