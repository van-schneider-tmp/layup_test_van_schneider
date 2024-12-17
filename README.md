# LayupApp
Application to satisfy Layup parts skills test - Plane Simulation MVP and Layup Sequence - EOY 2024

# Running the Application:
From the root of the project, run `npm run install:all`,
this will install all dependencies for the frontend and backend.
This project only requires frontend packages.

After installation, run `npm start` from the root.
This will kick off the application, dropping you into a localhost client
and starting the flight simulation.

Please click the "Task 2" button in the top right corner to see 
the metrics of the layup sequence.

# Flight Simulation Logic
I created a 3d scene for the flight simulation, with camera locked into a top-down view.
I allow users to control the airplane speed and yaw intuitively using arrow keys.
The trajectory of the airplane is determined by a left right arrow keyboard event that ticks a state variable. The state variable is passed to a component that updates the z rotational axes of my plane geometry (two cones). The speed is implemented similarly and an increase of speed moves the plane's x and y coordinates with the polar coordinates given by speed (magnitude) and yaw (degrees).

The terrain underneath the plane was a fun challenge surrounding render distance. Originally I was
mucking with a grid implementation, keeping track of a lot of different things (occupied cells in grid, position of cells, etc...). But took a step back and came up with two circles around the plane, randomly generating terrain in the "annular" space: ring formed by (area of large cirlce - area of small circle). I could then simply remove terrain whenever it falls outside of the larger circles radius. You can see this occuring more clearly with a tweak to the z position of the camera.