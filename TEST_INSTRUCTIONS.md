# Testing Instructions

## Prerequisites
Make sure both the frontend and backend servers are running:
- Frontend: http://localhost:5173
- Backend: http://localhost:3002

## Manual Testing Steps

1. **Verify Home Page Fix**
   - Navigate to http://localhost:5173
   - Click on the "Home" link in the navigation bar
   - Confirm that the page loads correctly and does not show a blank screen
   - Check that featured products are displayed

2. **Check Product Images**
   - Verify that all product images load correctly
   - Check that there are no 404 errors in the browser console for images

3. **Test Page Transitions**
   - Navigate between different pages (Home, Shop, About, Contact)
   - Observe smooth transitions between pages
   - Verify that animations work properly

4. **Test All Components**
   - Check the Hero section animations
   - Verify Product Card hover effects
   - Test Feature Grid animations
   - Confirm all buttons have proper hover effects

## Automated Testing

### Install Test Dependencies
```bash
cd frontend
npm install
```

### Run Unit Tests
```bash
cd frontend
npm test
```

### Run Tests in Watch Mode
```bash
cd frontend
npm run test:watch
```

## What to Look For

### Success Indicators
- No blank pages when clicking Home link
- All images load without 404 errors
- Smooth animations and transitions
- Responsive design works on all screen sizes
- No console errors in the browser

### Failure Indicators
- Blank screen when clicking Home
- Missing images or 404 errors
- Broken animations
- Layout issues on different screen sizes
- Console errors or warnings

## Common Issues and Solutions

### Blank Page Issue
**Symptoms**: Clicking Home shows a blank page
**Solution**: This has been fixed by correcting API response handling

### Image Loading Issues
**Symptoms**: Product images don't load, 404 errors in console
**Solution**: This has been fixed by correcting image path references

### Animation Performance
**Symptoms**: Janky or slow animations
**Solution**: All animations are GPU-accelerated and should run at 60fps on modern devices