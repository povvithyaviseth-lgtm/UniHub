This folder contains pure business logic that only uses standalone functions

import a services to the controller like this: 
import * as AuthService from "../services/auth.service.js";

use a function from a service in the controller like this: 
importName.functionName(parameter1, paremeter2);
ex: AuthService.userSignUp(email, password);

