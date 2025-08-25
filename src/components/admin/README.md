# Admin Panel - Development Only

⚠️ **IMPORTANT: Remove before production deployment**

## Files to Delete Before Production:

### Admin Panel Files:
- `/src/app/admin/` (entire folder)
- `/src/components/admin/` (entire folder)

### Admin Panel Features:
- Tags Management (CRUD operations)
- ActionDock Features Management (CRUD operations)
- Extensible for future admin components

## Admin Panel URL:
- Local: `http://localhost:3000/admin`
- Accessible during development only

## Security Note:
This admin panel has no authentication or authorization. It's purely for development convenience. 
**Never deploy this to production.**

## Quick Cleanup Command:
```bash
rm -rf src/app/admin src/components/admin
```

## Admin Capabilities:

### Tags Management:
- Create new subject tags
- Edit existing tags (label, icon, color, sort order)
- Delete tags
- Toggle active/inactive status

### ActionDock Features Management:
- Create new ActionDock input features
- Configure input types (number/text)
- Set default values, min/max constraints
- Toggle info icon display
- Manage display order

## Usage:
1. Start development server: `npm run dev`
2. Navigate to `/admin`
3. Use the grid navigation to switch between management sections
4. Create, edit, or delete items as needed
5. **Remember to delete admin panel before production!**
