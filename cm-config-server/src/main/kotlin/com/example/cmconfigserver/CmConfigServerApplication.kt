package com.example.cmconfigserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.config.server.EnableConfigServer

@SpringBootApplication
@EnableConfigServer
class CmConfigServerApplication

fun main(args: Array<String>) {
	runApplication<CmConfigServerApplication>(*args)
}
