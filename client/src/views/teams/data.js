import { v4 as uuid } from "uuid";

export default [
  {
    id: uuid(),
    createdAt: "27/03/2019",
    teamName: "redhat",
    description: "Team description of redhat",
    teamImage: "https://source.unsplash.com/random",
    Requirements: "react developer",
    teamSize: "4",
    totalProjects: "4",
    teamRatings: "4",
    status: "Available",
  },
  {
    id: uuid(),
    createdAt: "27/03/2019",
    teamName: "whitehat",
    description: "Dthis is the team description of whitehat",
    teamImage:
      "https://images.unsplash.com/photo-1605651707963-01c2baf9adee?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    Requirements: "javascript developer",
    teamSize: "3",
    totalProjects: "41",
    teamRatings: "9",
    status: "Busy",
  },
  {
    id: uuid(),
    createdAt: "27/03/2019",
    teamName: "blackhat",
    description: "we are hackers ",
    teamImage:
      "https://images.unsplash.com/photo-1607320615766-caf99e30ab2f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    Requirements: "linux programmer",
    teamSize: "4",
    totalProjects: "40",
    teamRatings: "1",
    status: "Available",
  },
  {
    id: uuid(),
    createdAt: "27/03/2019",
    teamName: "BrownHat",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    teamImage:
      "https://images.unsplash.com/photo-1606464994726-46e6ecf27a40?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    Requirements: "react developer",
    teamSize: "4",
    totalProjects: "4",
    teamRatings: "4",
    status: "Available",
  },
];
