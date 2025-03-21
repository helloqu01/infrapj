resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# 📦 S3 버킷 생성 (정적 파일 저장용)
resource "aws_s3_bucket" "frontend" {
  bucket        = "my-next-app-bucket-${random_string.suffix.result}"
  force_destroy = true
}

# 🌐 S3 버킷을 웹사이트로 설정 (index.html, 404.html)
resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

# 🧱 S3 버킷 퍼블릭 접근 설정 (Website Endpoint는 OAI 사용 불가이므로 퍼블릭 필수)
resource "aws_s3_bucket_public_access_block" "frontend_public" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 🌍 모든 사용자에게 S3 읽기 허용 (index.html 등 접근 가능)
resource "aws_s3_bucket_policy" "frontend_public_policy" {
  bucket = aws_s3_bucket.frontend.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.frontend.arn}/*"
      }
    ]
  })
}

# 🌐 CloudFront OAI 생성 (현재 사용 X — website_endpoint에서는 불필요)
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for S3 bucket access"
}

# 🚀 CloudFront 배포 (S3 정적 웹사이트를 글로벌 CDN으로 배포)
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.frontend.website_endpoint
    origin_id   = "S3Origin"

    # ✅ Website endpoint는 custom_origin_config 사용해야 함
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3Origin"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
