# src/components/
This folder holds small pieces of your website that can be reused on different pages.

Example:
Lets say our site has:
A navbar at the top of every page
A button that looks the same on every page
The clubcard that we use for every club

Instead of rewriting that code over and over, we make one copy of each and save them in the components folder
then reuse on them on different pages by importing them like this 
import Navbar from '../components/Navbar'