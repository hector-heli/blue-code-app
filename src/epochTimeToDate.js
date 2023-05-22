
export const epochTimeToDate = (epochTime) => {

  //console.log(typeof(epochTime)); // imprimir la fecha formateada

  const date = new Date(epochTime * 1000); // crear un objeto Date a partir del tiempo Epoch

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);

const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

if((epochTime) !== undefined) return formattedDate; else return "";
}

