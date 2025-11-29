# MANOX Admin Panel

A modern, fully-featured admin panel built with React, Tailwind CSS, and Framer Motion.

## Features

### 🎨 Modern UI/UX
- Glassmorphism design with subtle animations
- Responsive layout for all device sizes
- Smooth transitions and hover effects
- Dark/light theme support

### 📊 Dashboard
- Analytics cards with key metrics
- Sales overview visualization
- Recent orders activity feed
- Quick action buttons

### 🧭 Navigation
- Collapsible sidebar with icon navigation
- Top navbar with search and notifications
- Breadcrumb navigation
- Active page highlighting

### 👥 User Management
- User list with profile pictures
- Role-based access control
- User status management
- Sorting and filtering capabilities

### 🛍️ Product Management
- Product listing with images
- Create, read, update, delete operations
- Category and inventory management
- Image upload support

### 📦 Order Management
- Order tracking and status updates
- Detailed order information
- Customer information display
- Order history

### ⚙️ Settings
- General site configuration
- Theme customization
- Notification preferences
- Security settings

### 🔐 Authentication
- Secure login system
- Session management
- Role-based access control
- Password protection

### 🧩 UI Components
- Reusable card components
- Modal dialogs
- Toast notifications
- Loading spinners
- Buttons with multiple variants
- Form elements

## Tech Stack

- **Frontend**: React, React Router, Framer Motion
- **Styling**: Tailwind CSS
- **State Management**: React Hooks, Context API
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **API Client**: Axios

## Component Structure

```
Admin/
├── components/
│   ├── AdminLayout.jsx     # Main layout with sidebar and navbar
│   ├── Sidebar.jsx         # Navigation sidebar
│   ├── Navbar.jsx          # Top navigation bar
│   ├── Card.jsx            # Reusable card component
│   ├── StatCard.jsx        # Statistics card component
│   ├── Button.jsx          # Custom button component
│   ├── Modal.jsx           # Modal dialog component
│   ├── Toast.jsx           # Toast notification component
│   ├── ToastProvider.jsx   # Toast context provider
│   ├── LoadingSpinner.jsx  # Loading spinner component
│   └── Tooltip.jsx         # Tooltip component
├── Dashboard.jsx           # Admin dashboard
├── Login.jsx               # Authentication login page
├── Products.jsx            # Product management
├── ProductEdit.jsx         # Product creation/editing
├── Orders.jsx              # Order management
├── OrderDetails.jsx        # Order details view
├── Users.jsx               # User management
└── Settings.jsx            # Application settings
```

## Design Principles

### 🎨 Visual Design
- **Glassmorphism**: Frosted glass effects for depth and modernity
- **Subtle Animations**: Smooth transitions using Framer Motion
- **Consistent Spacing**: Uniform padding and margins
- **Typography Hierarchy**: Clear heading and text styles

### 📱 Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive components
- Touch-friendly controls

### 🎯 User Experience
- Intuitive navigation
- Clear visual hierarchy
- Immediate feedback
- Accessible components

## Animation Features

- Page transitions
- Hover effects
- Loading animations
- Modal transitions
- Toast notifications
- Collapsible sidebar

## Customization

### Theme Colors
The admin panel uses the following color palette:
- Primary: `#FF0F7B` (Fuchsia)
- Secondary: `#1E90FF` (Blue)

### Component Variants
Most components support multiple variants:
- Buttons: primary, secondary, outline, danger, ghost
- Cards: standard, glass effect
- Toasts: success, error, warning, info

## Usage

### Authentication
1. Navigate to `/admin/login`
2. Enter admin credentials
3. Access protected routes

### Navigation
- Use sidebar for main navigation
- Use navbar for quick actions
- Breadcrumbs show current location

### Data Management
- CRUD operations available for products, orders, and users
- Real-time data updates
- Form validation

## Performance

- Optimized bundle size
- Lazy loading for components
- Efficient re-rendering
- Image optimization

## Accessibility

- Keyboard navigation support
- Screen reader compatibility
- Proper contrast ratios
- Semantic HTML structure

## Security

- Token-based authentication
- Role-based access control
- Input validation
- Secure API communication