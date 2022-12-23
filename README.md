# Snake_Game
SPA Snake Game - Javascript

Juego basado en el video https://www.youtube.com/watch?v=J42SZXS-_Qo&ab_channel=ServetGulnaroglu , donde se programa un Snake Game en JS y HTML.

Luego de estudiar la teoría elemental de Javascript, HTML y CSS, este fue mi primer proyecto. Pude poner en práctica muchos de los conceptos que había estudiado, y aprender varias cosas nuevas.

En el desarrollo del juego, aprendí a cómo se debe pensar una aplicación, separandola en primer momento en sus partes elementales, y luego combinandolas haciendo que interactuen entre ellas. En este caso, las partes elementales serían la serpiente, la manzana, y el área de juego.

## Snake:

Creamos la clase Snake, y utilizando el método ```constructor``` definimos sus propiedades, coordenadas, tamaño, largo, y dirección de desplazamiento.

También definimos un método para realizar el movimiento de la serpiente. ¿Cómo funciona su movimiento? Basicamente la serpiente estará constituida por rectangulos, donde cada uno tendrá asignadas ciertas coordenadas X e Y. Cada vez que la serpiente avanza lo podemos pensar como que la cabeza avanza una posición, y la cola se borra (último rectángulo), y el resto del cuerpo permanece en la misma posición, así para cada recuadro (o Frame). Entonces, almacenando el cuerpo de la serpiente como ```this.tail = [{x:this.x, y:this.y}]``` y usando los Built-in methods ```.shift()``` y ```.push()``` podemos llevar a cabo el comportamiento deseado.

## Apple:

La manzana podrá ser definida con sus coordenadas X e Y, el color, y el tamaño (igual al tamaño de la serpiente). Por lo que creamos una clase con estas propiedades.
Las coordenadas en las que se dibujará la manzana se generan aleatoriamente, pero antes se corrobora si estan en contacto con la serpiente o no (es decir, si la manzana al generarse aleatoriamente aparece sobre el cuerpo de la serpiente, se deberán definir otras coordenadas X e Y para que aparezca). Esto lo hacemos con un ciclo ```while``` que compara las coordenadas generas aleatoriamente con las coordenadas de la serpiente, y sale del loop si no hay coincidencia entre ellas.

## Área de Juego:

Esta será simplemente un rectángulo, para el cual utilizamos un HTML Element ```<canvas> ... </canvas>``` que controlaremos mediante el script de JavaScript. Cabe mencionar que las posibles coordenadas de la serpiente y manzana se ven limitadas por el tamaño del canvas. En el caso de la manzana al momento de su generación aleatoria tiene en cuenta las dimensiones del canvas (```document.getElementById("canvas").width``` y ```document.getElementById("canvas").height```), y la serpiente verifica si en su movimiento se "chocó" contra las paredes del canvas.

## Lógica del Juego:

1- Con la función ```gameLoop()``` iniciamos el loop del juego mediante el método ```setInterval(show, delay)```, disparando la función ```show()``` cada ```delay``` milisegundos.

2- La función ```show()``` primero llama a la función ```update()``` para actualizar el estado de la serpiente y de la manzana. Mueve una posición la serpiente, corrobora que no se haya chocado ninguna pared ni contra ella misma, y corrobora si se comio la manzana.

Ahora tenemos 3 situaciones posibles: a- No chocó ni se comió la manzana. b- Chocó contra la pared o contra ella misma. c- Se comió la manzana.

### Caso A: No chocó ni se comió la manzana.

3-A- Luego de pasar exitosamente por ```update()```, la función ```show()``` llama a ```draw()```, donde si redibuja el canvas, se redibuja la serpiente en su nueva posición, y se redibuja la manzana (en la misma posición que antes ya que no se la comió).

4-A- Se termina el loop, y despues de ```delay``` milisegundos se vuelve a ejecutar la función ```show()```, repitiendose los pasos anteriores.

### Caso B: Chocó contra la pared o contra ella misma.

3-B- Dentro de ```update()```, la función ```checkHit()``` corrobró que hubo un choqué. Esta función tiene 2 funciones, ```checkHitWall()``` y ```checkHitItself()```, si se da un impacto (coincide coordenadas de la cabeza de la serpiente con alguna coordenada de su cuerpo, o con coordenadas de los bordes del canvas) se dispara la función ```gameOver()```.

4-B- ```gameOver()``` Corta el loop del juego con el método ```clearInterval()```.

### Caso C: Se comió la manzana.

3-C- Dentro de ```update()```, la función ```eatApple()``` corrobora si se comio la manzana (coincidencia entre coordenadas de la cabeza y la manzana). Al coincidir las coordenadas, se crea una nueva instance de la clase ```Apple()```, termina de ejecutarse exitosamente la función ```update()```, y vuelve a pasar con el caso A, que se redibuja el canvas, serpiente y manzana, solamente que ahora la manzana tendrá nuevas coordenadas.

4-C- Se termina el loop, y despues de ```delay``` milisegundos se vuelve a ejecutar la función ```show()```, repitiendose los pasos anteriores.

## Modificaciones respecto al proyecto base:

Luego de tener la base del juego lista, aprendiendo bastante sobre la lógica a utilizar en el desarrollo, sintaxis, métodos, propiedades, clases, entre otras cosas, realicé algunos cambios y agregué features.

1- Función para corroborar impacto contra las paredes. En el código original la serpiente podia salir y volver a entrar al área de juego.

2- Función de Game Over.

3- Reorganizar llamado a funciones, para mejorar legibilidad.

4- Quitar puntaje del canvas, y situarlo en un elemento HTML diferente.

5- Botones de Start, Restart, selección de niveles de dificultad, y su lógica en JavaScript.
