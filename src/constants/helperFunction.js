import convert from 'color-convert';


export const generateLightColor = (categoryName) => {
    const hue = Math.abs(categoryName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % 360;
    const lightness = 90; // You can adjust this value to control the lightness of the color

    // Convert HSL to RGB and then to HEX
    const rgb = convert.hsl.rgb(hue, 100, lightness);
    const hexColor = convert.rgb.hex(rgb);
  
    return `#${hexColor}`;
}

export const toSnakeCase = (input) => {
    const cleanedInput = input?.toLowerCase()?.replace(/\s+/g, '_')?.replace(/[^a-zA-Z0-9_]/g, ''); // Remove any characters other than letters, digits, and underscores
      
    // Remove trailing underscores
    return cleanedInput?.replace(/_+$/, '');
}

export const toTitleCase = (input) => {
    return input?.replace(/_/g, ' ')?.replace(/\w\S*/g, (text) => text?.charAt(0)?.toUpperCase() + text?.substr(1)?.toLowerCase());
}

export const timeAgo = (timestamp) => {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp;
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const monthsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));

  if (minutesAgo < 1) {
    return 'Just now';
  } else if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  } else if (daysAgo < 30) {
    return `${daysAgo} days ago`;
  } else if (monthsAgo === 1) {
    return '1 month ago';
  } else {
    return `${monthsAgo} months ago`;
  }
}


export const isValidFileType = async (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  return allowedTypes.includes(file.type);
}
