const formatType = (type: string): string => {
    let color: string;
   
    switch (type) {
      case 'HTML': 
        color = 'red lighten-1'; 
        break; 
      case 'CSS': 
        color = 'blue lighten-1'; 
        break; 
      case 'PHP': 
        color = 'green lighten-1'; 
        break; 
      case 'Java': 
        color = 'brown lighten-1'; 
        break; 
      case 'Javascript': 
        color = 'grey lighten-3'; 
        break; 
      case 'UNIX': 
        color = 'blue lighten-3'; 
        break; 
      case 'C': 
        color = 'deep-purple accent-1'; 
        break; 
      case 'C++': 
        color = 'pink lighten-4'; 
        break; 
      case '.NET': 
        color = 'deep-purple darken-2'; 
        break; 
      case 'SQL': 
        color = 'lime accent-1'; 
        break; 
      case 'ASM': 
        color = 'deep-orange'; 
        break; 
      default: 
        color = 'grey'; 
        break; 
    }
   
    return `chip ${color}`;
  }

  export default formatType;