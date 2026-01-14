# Bashkeveprimi - Humanitarian Organization Platform

## Project Overview

**Bashkeveprimi** (Albanian for "Together") is a humanitarian organization website dedicated to supporting families, orphans, and communities in need across Kosovo. The platform aims to restore hope, dignity, and opportunity through various charitable initiatives including food distribution, education support, livestock donations, and community development.

### Mission Statement
"Together for a brighter future" - Supporting families, orphans, and communities in need across Kosovo.

---

## Technology Stack

### Frontend (Current Implementation)
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.2
- **Styling**: Tailwind CSS v4.1.17
- **Routing**: React Router DOM 7.9.6
- **Node Version**: 22.12.0 (managed via nvm)
- **Development Server**: Port 5174/5175

### Recommended Backend Stack
- **Framework**: Django 5.x
- **API**: Django REST Framework
- **Database**: PostgreSQL (recommended) or MySQL
- **Authentication**: Django JWT or Django Allauth
- **File Storage**: AWS S3 or local storage with Django Storages
- **Task Queue**: Celery + Redis (for async tasks)
- **Payment Integration**: Stripe or local payment gateway (Kosovo-specific)
- **Email**: Django Email with SMTP backend

---

## Project Structure

### Frontend Pages

1. **Home** (`/`)
   - Periodic Actions Slider (auto-rotating causes)
   - Bashkeveprimi Features
   - Recent Organization Causes with donation progress
   - Contact Information

2. **Orphans** (`/orphans`)
   - Project showcase with descriptions
   - Regional impact (Ferizaj, Gjilan, Prishtina)
   - Success stories

3. **Projects** (`/projects`)
   - Detailed project information
   - Regional implementations
   - Impact metrics

4. **Requests** (`/requests`)
   - [Currently empty - to be developed]
   - Intended for donation requests or help requests

5. **About Us** (`/about-us`)
   - Organization information
   - Mission and vision
   - Statistics (Projects completed, Monthly donations, etc.)
   - Video descriptions
   - Contact form ("Get in Touch")
   - Team information

---

## Core Features & Components

### 1. Periodic Actions Slider
- **Purpose**: Showcase rotating charitable causes
- **Components**: Auto-sliding carousel (3-second intervals)
- **Data Structure**:
  ```typescript
  {
    id: number,
    title: string,
    slogan: string,
    description: string,
    image: string
  }
  ```
- **Actions**: "Donate Now" CTA buttons

### 2. Organization Features
Four main organizational focuses:

1. **Direct Help**
   - Food distribution
   - Clean water supply
   - Winter aid packages
   - Essential care

2. **Giving Information**
   - Community updates
   - Donor connections
   - Support guidance

3. **Raising Awareness**
   - Orphan support campaigns
   - Vulnerable family highlighting
   - Community engagement

4. **Relieving Poverty**
   - Farming equipment (tractors, tools)
   - Sewing machines
   - Egg incubators
   - Livestock donations (cows)
   - Long-term sustainability solutions

### 3. Recent Causes
- **Display**: Grid layout showcasing active causes
- **Features**:
  - Progress bars (collected vs. demanded amounts)
  - Donation tracking
  - Visual storytelling with images
  - Individual cause pages
- **Data Structure**:
  ```typescript
  {
    id: number,
    title: string,
    demandedAmount: string,
    collectedAmount: string,
    description: string,
    image: string
  }
  ```

### 4. Regional Projects
Cities currently covered:
- **Ferizaj**: Dairy support, nutrition improvement
- **Gjilan**: Fresh dairy products, school expenses
- **Prishtina**: Sustainable income sources

### 5. Contact Information
- **Phone**: +383 45-111-222 (placeholder)
- **Email**: info@max.com (placeholder), bashkeveprimi@gmail.com
- **Location**: Gjilan, Kosovo

### 6. Organization Statistics
Current achievements displayed:
- **1.2k+** Projects Completed
- **850+** Monthly Donations
- **320+** Donations Received

### 7. Get in Touch Form
Contact form with fields:
- First Name
- Last Name
- Email
- Phone Number
- Message (textarea)

---

## Django Backend Requirements

### Database Models

#### 1. User Model
```python
# Custom User or extend Django's default User
- id
- username
- email
- first_name
- last_name
- phone_number
- user_type (donor, volunteer, admin, beneficiary)
- created_at
- updated_at
- is_active
- is_verified
```

#### 2. Cause/Campaign Model
```python
class Cause:
    - id (AutoField)
    - title (CharField, max_length=200)
    - slug (SlugField, unique=True)
    - slogan (CharField, max_length=300, nullable)
    - description (TextField)
    - short_description (TextField, max_length=500)
    - category (ForeignKey to Category)
    - demanded_amount (DecimalField, max_digits=10, decimal_places=2)
    - collected_amount (DecimalField, max_digits=10, decimal_places=2, default=0)
    - featured_image (ImageField)
    - gallery_images (ManyToMany to Image model)
    - status (CharField: active, completed, paused, cancelled)
    - featured (BooleanField, default=False)
    - priority (IntegerField, for slider ordering)
    - location (ForeignKey to Location)
    - start_date (DateField)
    - end_date (DateField, nullable)
    - created_by (ForeignKey to User)
    - created_at (DateTimeField)
    - updated_at (DateTimeField)
    - view_count (IntegerField, default=0)
```

#### 3. Category Model
```python
class Category:
    - id
    - name (CharField: Orphans, Education, Food, Water, Livestock, etc.)
    - slug (SlugField)
    - icon (ImageField)
    - description (TextField)
    - is_active (BooleanField)
    - created_at (DateTimeField)
```

#### 4. Location Model
```python
class Location:
    - id
    - city (CharField: Ferizaj, Gjilan, Prishtina, etc.)
    - region (CharField)
    - country (CharField, default="Kosovo")
    - latitude (DecimalField, nullable)
    - longitude (DecimalField, nullable)
    - is_active (BooleanField)
```

#### 5. Donation Model
```python
class Donation:
    - id
    - cause (ForeignKey to Cause)
    - donor (ForeignKey to User, nullable for anonymous)
    - donor_name (CharField, for anonymous donations)
    - donor_email (EmailField)
    - amount (DecimalField)
    - currency (CharField, default="EUR")
    - payment_method (CharField: card, bank_transfer, cash)
    - payment_status (CharField: pending, completed, failed, refunded)
    - transaction_id (CharField, unique)
    - message (TextField, nullable)
    - is_anonymous (BooleanField, default=False)
    - is_recurring (BooleanField, default=False)
    - recurring_frequency (CharField, nullable: monthly, quarterly, yearly)
    - created_at (DateTimeField)
    - processed_at (DateTimeField, nullable)
```

#### 6. Project Model
```python
class Project:
    - id
    - title (CharField)
    - slug (SlugField)
    - project_type (CharField: Food Package, Cow Donation, Education, etc.)
    - description (TextField)
    - location (ForeignKey to Location)
    - featured_image (ImageField)
    - gallery_images (ManyToMany to Image)
    - beneficiaries_count (IntegerField)
    - impact_description (TextField)
    - status (CharField: planning, ongoing, completed)
    - completion_date (DateField, nullable)
    - related_causes (ManyToMany to Cause)
    - created_at (DateTimeField)
    - updated_at (DateTimeField)
```

#### 7. ContactMessage Model
```python
class ContactMessage:
    - id
    - first_name (CharField)
    - last_name (CharField)
    - email (EmailField)
    - phone_number (CharField)
    - message (TextField)
    - status (CharField: new, read, responded, archived)
    - responded_by (ForeignKey to User, nullable)
    - response_message (TextField, nullable)
    - created_at (DateTimeField)
    - responded_at (DateTimeField, nullable)
```

#### 8. OrganizationInfo Model
```python
class OrganizationInfo:
    - id
    - name (CharField, default="Bashkeveprimi")
    - mission_statement (TextField)
    - vision_statement (TextField)
    - phone (CharField)
    - email (EmailField)
    - address (TextField)
    - city (CharField)
    - country (CharField)
    - projects_completed (IntegerField)
    - monthly_donations_count (IntegerField)
    - total_donations_received (IntegerField)
    - facebook_url (URLField, nullable)
    - instagram_url (URLField, nullable)
    - twitter_url (URLField, nullable)
    - youtube_url (URLField, nullable)
    - updated_at (DateTimeField)
```

#### 9. AboutVideo Model
```python
class AboutVideo:
    - id
    - title (CharField)
    - description (TextField)
    - video_file (FileField or URLField)
    - thumbnail (ImageField)
    - duration (IntegerField, in seconds)
    - order (IntegerField)
    - is_active (BooleanField)
    - created_at (DateTimeField)
```

#### 10. Feature Model
```python
class Feature:
    - id
    - title (CharField: Direct Help, Giving Information, etc.)
    - description (TextField)
    - icon (ImageField)
    - order (IntegerField)
    - is_active (BooleanField)
```

#### 11. Volunteer Model
```python
class Volunteer:
    - id
    - user (ForeignKey to User)
    - skills (TextField)
    - availability (CharField)
    - status (CharField: pending, approved, active, inactive)
    - applied_at (DateTimeField)
    - approved_at (DateTimeField, nullable)
```

#### 12. Request Model (for help requests)
```python
class Request:
    - id
    - requester_name (CharField)
    - requester_email (EmailField)
    - requester_phone (CharField)
    - location (ForeignKey to Location)
    - request_type (CharField)
    - description (TextField)
    - supporting_documents (FileField, nullable)
    - urgency_level (CharField: low, medium, high, critical)
    - status (CharField: pending, under_review, approved, rejected, fulfilled)
    - assigned_to (ForeignKey to User, nullable)
    - created_at (DateTimeField)
    - updated_at (DateTimeField)
```

### API Endpoints Required

#### Public Endpoints (No authentication required)

**Causes/Campaigns**
- `GET /api/causes/` - List all active causes (with pagination)
- `GET /api/causes/featured/` - Get featured causes for slider
- `GET /api/causes/<slug>/` - Get cause details
- `GET /api/causes/category/<category-slug>/` - Filter by category
- `GET /api/causes/location/<city>/` - Filter by location

**Projects**
- `GET /api/projects/` - List all projects
- `GET /api/projects/<slug>/` - Get project details
- `GET /api/projects/location/<city>/` - Filter by location

**Categories**
- `GET /api/categories/` - List all categories

**Locations**
- `GET /api/locations/` - List all locations

**Organization Info**
- `GET /api/organization/` - Get organization information
- `GET /api/organization/statistics/` - Get statistics (projects, donations count)
- `GET /api/features/` - Get organization features

**Contact**
- `POST /api/contact/` - Submit contact form

**Videos**
- `GET /api/videos/` - List about videos

**Donations**
- `POST /api/donations/` - Create donation (triggers payment gateway)
- `POST /api/donations/verify/` - Verify payment callback

#### Protected Endpoints (Authentication required)

**User Management**
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/` - Update user profile

**Donations (User)**
- `GET /api/donations/my-donations/` - User's donation history

**Volunteers**
- `POST /api/volunteers/apply/` - Apply to become volunteer
- `GET /api/volunteers/my-application/` - Check volunteer application status

**Requests**
- `POST /api/requests/` - Submit help request
- `GET /api/requests/my-requests/` - User's submitted requests

#### Admin Endpoints (Admin/Staff only)

**Cause Management**
- `POST /api/admin/causes/` - Create cause
- `PUT /api/admin/causes/<id>/` - Update cause
- `DELETE /api/admin/causes/<id>/` - Delete cause
- `PATCH /api/admin/causes/<id>/status/` - Update cause status

**Project Management**
- `POST /api/admin/projects/` - Create project
- `PUT /api/admin/projects/<id>/` - Update project
- `DELETE /api/admin/projects/<id>/` - Delete project

**Contact Messages**
- `GET /api/admin/contact-messages/` - List contact messages
- `PATCH /api/admin/contact-messages/<id>/` - Mark as read/respond

**Volunteer Management**
- `GET /api/admin/volunteers/` - List volunteer applications
- `PATCH /api/admin/volunteers/<id>/approve/` - Approve volunteer
- `PATCH /api/admin/volunteers/<id>/reject/` - Reject volunteer

**Request Management**
- `GET /api/admin/requests/` - List help requests
- `PATCH /api/admin/requests/<id>/status/` - Update request status
- `PUT /api/admin/requests/<id>/` - Update request details

**Organization Management**
- `PUT /api/admin/organization/` - Update organization info

**Analytics**
- `GET /api/admin/analytics/donations/` - Donation analytics
- `GET /api/admin/analytics/causes/` - Cause performance
- `GET /api/admin/analytics/traffic/` - Website traffic

---

## Key Functional Requirements

### 1. Donation System
- Support one-time and recurring donations
- Multiple payment methods
- Anonymous donation option
- Donation receipts via email
- Real-time donation progress updates
- Currency support (EUR primary)

### 2. Cause Management
- Featured causes for homepage slider
- Progress tracking (collected vs. demanded)
- Category filtering
- Location-based filtering
- Search functionality
- Status management (active, completed, paused)

### 3. Content Management
- Rich text editor for descriptions
- Multi-image upload for galleries
- Video upload and management
- SEO-friendly URLs (slugs)

### 4. Communication
- Contact form with email notifications
- Donation confirmation emails
- Newsletter subscription (future enhancement)
- Admin response system for messages

### 5. User Management
- User registration and authentication
- Profile management
- Donation history
- Volunteer application tracking

### 6. Analytics & Reporting
- Donation tracking and reports
- Cause performance metrics
- Donor demographics
- Impact reports

### 7. Security Features
- CSRF protection
- XSS prevention
- SQL injection protection
- Secure payment processing
- Rate limiting on API endpoints
- Input validation and sanitization

---

## Integration Requirements

### Payment Gateway
**Primary**: Stripe or local Kosovo payment gateway
- Payment processing
- Webhook handling for payment status
- Refund processing
- Recurring payment management

### Email Service
- SMTP configuration for transactional emails
- Email templates for:
  - Donation confirmations
  - Contact form submissions
  - Newsletter
  - Request status updates

### File Storage
- AWS S3 or similar for production
- Local storage for development
- Image optimization and thumbnailing
- Video streaming capabilities

### Analytics
- Google Analytics integration
- Custom event tracking for donations
- Conversion tracking

---

## Data Migration & Seeding

Initial data to seed:

1. **Categories**
   - Orphan Support
   - Education
   - Food Distribution
   - Water Supply
   - Livestock Donation
   - Emergency Aid
   - Community Development

2. **Locations**
   - Ferizaj
   - Gjilan
   - Prishtina
   - Prizren
   - Other Kosovo cities

3. **Features**
   - Direct Help
   - Giving Information
   - Raising Awareness
   - Relieving Poverty

4. **Organization Info**
   - Current statistics
   - Contact information
   - Mission statement

---

## Environment Variables (Django)

```bash
# Django Settings
SECRET_KEY=
DEBUG=False
ALLOWED_HOSTS=

# Database
DATABASE_ENGINE=django.db.backends.postgresql
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=5432

# CORS (for React frontend)
CORS_ALLOWED_ORIGINS=http://localhost:5174,http://localhost:5175

# Email
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
DEFAULT_FROM_EMAIL=

# AWS S3 (if used)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_STORAGE_BUCKET_NAME=
AWS_S3_REGION_NAME=

# Payment Gateway
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Celery
CELERY_BROKER_URL=redis://localhost:6379
CELERY_RESULT_BACKEND=redis://localhost:6379

# Other
MAX_UPLOAD_SIZE=10485760  # 10MB
PAGINATION_PAGE_SIZE=12
```

---

## API Response Format

### Success Response
```json
{
  "status": "success",
  "data": {
    // response data
  },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "status": "error",
  "errors": {
    "field_name": ["Error message"]
  },
  "message": "Validation failed"
}
```

### Pagination Response
```json
{
  "status": "success",
  "data": {
    "count": 100,
    "next": "http://api.example.com/api/causes/?page=2",
    "previous": null,
    "results": []
  }
}
```

---

## Testing Requirements

### Unit Tests
- Model validations
- Serializer logic
- Custom utility functions
- View permissions

### Integration Tests
- API endpoint responses
- Authentication flow
- Payment processing
- Email sending

### End-to-End Tests
- Complete donation flow
- User registration and login
- Contact form submission
- Cause creation and management

---

## Deployment Considerations

### Backend Deployment
- **Hosting**: AWS EC2, DigitalOcean, Heroku, or VPS
- **Web Server**: Gunicorn + Nginx
- **Database**: Managed PostgreSQL (RDS, DigitalOcean Managed DB)
- **Cache**: Redis
- **Task Queue**: Celery workers
- **Monitoring**: Sentry for error tracking
- **Logging**: Structured logging with rotation

### Frontend Deployment
- **Hosting**: Vercel, Netlify, or AWS S3 + CloudFront
- **Build**: `npm run build`
- **Environment Variables**: API endpoint configuration

### CI/CD
- GitHub Actions or GitLab CI
- Automated testing
- Automated deployment
- Database migrations

---

## Future Enhancements

1. **Mobile Application**
   - Native iOS/Android apps
   - React Native or Flutter

2. **Advanced Features**
   - SMS notifications
   - WhatsApp integration
   - Multi-language support (Albanian, English, Serbian)
   - Beneficiary dashboard
   - Volunteer portal
   - Real-time donation tracking
   - Social media integration
   - Blog/News section

3. **Analytics**
   - Advanced reporting dashboard
   - Donor insights
   - Impact visualization
   - Custom reports

4. **Gamification**
   - Donor badges and achievements
   - Leaderboards
   - Impact stories

5. **Integration**
   - Social login (Facebook, Google)
   - Calendar integration for events
   - CRM integration

---

## Contact & Support

**Organization**: Bashkeveprimi  
**Location**: Gjilan, Kosovo  
**Email**: bashkeveprimi@gmail.com  
**Phone**: +383 048 225 402

---

## Repository Information

**Frontend Repository**: Current repository  
**Branch**: `develop` (main development branch)  
**Node Version**: 22.12.0 (via nvm)  
**Package Manager**: npm

### Quick Start Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

---

## Notes for Django Backend Developer

1. **CORS Configuration**: Frontend runs on port 5174/5175, ensure CORS is properly configured

2. **API Versioning**: Consider using `/api/v1/` for future-proofing

3. **Authentication**: JWT recommended for stateless authentication between React and Django

4. **File Uploads**: Handle large file uploads (videos) with proper validation

5. **Performance**: 
   - Use Django caching for frequently accessed data
   - Optimize database queries (select_related, prefetch_related)
   - Implement pagination for list endpoints
   - Use CDN for static assets

6. **Security**:
   - Implement rate limiting (django-ratelimit)
   - Use Django REST Framework permissions
   - Validate all user inputs
   - Sanitize HTML content
   - Use HTTPS in production

7. **Database Indexes**: Add indexes on frequently queried fields (slug, status, created_at)

8. **Background Tasks**: Use Celery for:
   - Sending emails
   - Processing payments
   - Generating reports
   - Image optimization

9. **Monitoring**: Set up Sentry or similar for error tracking

10. **Documentation**: Use Django REST Framework's built-in API documentation or Swagger/OpenAPI

---

*Last Updated: November 30, 2025*

