from django.template.loader import render_to_string

def get_registration_message(validated_data):
	message = render_to_string('welcome_mail.html', {
		'first_name': validated_data['first_name'],
		'username': validated_data['username'],
		'password': validated_data['password'],
	})
	return message
