module.exports = {
  apps : [{
    name: "Portfolio",
    script: "./server/index.js",
    "cwd": "./project",
    // "error_file": "../runtime/logs/node.error.log",
    // "pid_file": "../runtime/tmp/landing.pid",
    "max_memory_restart": "512M",
    "env": {
      "NODE_ENV": "production"
    }
  }]
}
