function p1(input: string[]): number {
	
  let dY = 0; 
  let dX = 0;

  for (let i = 0 ; i < input.length ; i++) {
      var step: number = parseInt(input[i + 1]);
      switch (input[i]) {
          case 'forward':
            dX += step;
            break;
          case 'down':
            dY += step;
            break;
          case 'up':
            dY -= step;
            break;
      }
  }

  return dY * dX;
}

function p2(input: string[]): number {

    let dY = 0; 
    let dX = 0;
    let aim = 0;

    for (let i = 0 ; i < input.length ; i++) {
        var step: number = parseInt(input[i + 1]);
        switch (input[i]) {
            case 'forward':
              dX += step;
              dY += (aim * step);
              break;
            case 'down':
              aim += step;
              break;
            case 'up':
              aim -= step;
              break;
        }
    }

    return dY * dX;
}