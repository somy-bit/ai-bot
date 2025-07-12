import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'assistly'
  }
};



  

export default nextConfig;
