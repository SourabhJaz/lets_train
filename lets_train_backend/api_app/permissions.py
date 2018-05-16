from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
	message = 'Permisssion denied'
	def has_permission(self, request, view):
		# Read permission - always allow for GET request
		if request.method in permissions.SAFE_METHODS:
			return True

		# Write permissions - only if admin
		return request.user.is_staff