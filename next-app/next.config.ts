// next.config.js
const nextConfig = {
  output: 'export',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'https://46bemqujkp.us-east-1.awsapprunner.com/api/:path*', // App Runner의 API URL로 변경
        destination: 'http://infrapj-alb-975883155.us-east-1.elb.amazonaws.com/api/:path*', // App Runner의 API URL로 변경

        
      },
    ];
  },
};

export default nextConfig;
