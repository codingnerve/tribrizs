module.exports = {
  apps: [
    {
      name: "tribrizs",
      script: "npm",
      args: "run start -- -p 3005",
      cwd: "./",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3005,
      },
    },
  ],
};
