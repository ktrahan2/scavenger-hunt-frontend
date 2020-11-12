# On The Hunt

On The Hunt is an interactive app that allows the user to generate a random scavanger hunts based on selections of a theme and amount of items to find.  

# Table Of Contents 
- [Description](https://github.com/ktrahan2/scavenger-hunt-frontend#description)
- [How It Works](https://github.com/ktrahan2/scavenger-hunt-frontend#how-it-works)
- [Example Code](https://github.com/ktrahan2/scavenger-hunt-frontend#example-code)
- [Technology Used](https://github.com/ktrahan2/scavenger-hunt-frontend#technology-used)
- [Main Features](https://github.com/ktrahan2/scavenger-hunt-frontend#main-features)
- [Features in Progress](https://github.com/ktrahan2/scavenger-hunt-frontend#features-in-progress)
- [Contact Information](https://github.com/ktrahan2/scavenger-hunt-frontend#contact-information)
- [Link to Backend Repo](https://github.com/ktrahan2/scavenger-hunt-frontend#link-to-backend-repo)

## Description

Whenever users first load into the app they will be greeted on the home page with a description of what the app is and an example of what a scavenger hunt
might look like. From here the user can sign up or login and gain access to their previous saved hunts or create a new list from a random generator.
While using their scavenger hunt list the user will be able to save their checked progress in case they aren't able to finish and want to come back to it later. 

## How It Works

[On The Hunt](https://www.youtube.com/watch?v=RJUS6SivbOI&t=4s)

## Example Code 
Here is a reusable TextInput creator for forms.
```
   const createTextInput = () => {
        return input !== "password" ?
              <TextInput
                name={input}
                label={input}
                style={styles.input}
                placeholder={"Enter" + " " + input}
                onChangeText={handleChange(input)}
                value={values.input}
                autoCapitalize="none"
                placeholderTextColor= "rgba( 61, 85, 35, 1)"
            />
        : 
            <TextInput
                name={input}
                label={input}
                style={styles.input}
                placeholder={"Enter" + " " + input}
                onChangeText={handleChange(input)}
                value={values.input}
                autoCapitalize="none"
                placeholderTextColor= "rgba( 61, 85, 35, 1)"
                secureTextEntry={true}
            />
    }
```
Reusable splash screen handler. 
```
   const sendTo = (  ) => {

        { setTimeout( () => { 
            navigation.navigate("On The Hunt") }, 
            isNavigationTimer - 1
        )}
        { setTimeout( () => { 
            navigation.navigate(isNavigationLocation) }, 
            isNavigationTimer
        )}
        
    } 
```

## Technology Used

- React Native
- Redux
- React Navigation

## Main Features

- User can create an account and receive access through a JWT token.
- User can generate a random list of scavenger hunt items to find.
- User can save and update their list in order to come back to the hunt later.

## Features in Progress

- Allow users to search all previous list made in order to share with friends.
- Allow users to create list instead of randomly generating them. 

## Contact Information

[Kyle Trahan](https://www.linkedin.com/in/kyle-trahan-8384678b/)

## Link to Backend Repo

https://github.com/ktrahan2/scavenger-hunt-backend
