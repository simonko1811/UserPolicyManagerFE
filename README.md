Front end for Manager of users and policies that are applicable to them.

Applicabality of policies is checked everytime a policy is created or edited for all users, and for 1 specific user when that user is edited.

Existing end-points are: 
  
	/users
	/users/new
	/policies
	/policies/new 

New users can be created and they are checked for policy applicabily. For persistance json files were used both for users and policies.
When new policy is added all existing users are checked and assign if condition is fullfilled.

Technology used Angular.
