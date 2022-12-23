# Snake_Game
SPA Snake Game - Javascript

Juego basado en el video https://www.youtube.com/watch?v=J42SZXS-_Qo&ab_channel=ServetGulnaroglu , donde se programa un Snake Game en JS y HTML.

Luego de estudiar la teoría elemental de Javascript, HTML y CSS, este fue mi primer proyecto. Pude poner en práctica muchos de los conceptos que había estudiado, y aprender varias cosas nuevas.

En el desarrollo del juego, aprendí a cómo se debe pensar una aplicación, separandola en primer momento en sus partes elementales, y luego combinandolas haciendo que interactuen entre ellas. En este caso, las partes elementales serían la serpiente, la manzana, y el área de juego.

###### Snake:

Creamos la clase Snake, y utilizando el método ```constructor``` definimos sus propiedades, coordenadas, tamaño, largo, y dirección de desplazamiento.

También definimos un método para realizar el movimiento de la serpiente. ¿Cómo funciona su movimiento? Basicamente la serpiente estará constituida por rectangulos, donde cada uno tendrá asignadas ciertas coordenadas X e Y. Cada vez que la serpiente avanza lo podemos pensar como que la cabeza avanza una posición, y la cola se borra (último rectángulo), y el resto del cuerpo permanece en la misma posición, así para cada recuadro (o Frame). Entonces, almacenando el cuerpo de la serpiente como ```this.tail = [{x:this.x, y:this.y}]``` y usando los Built-in methods ```.shift()``` y ```.push()``` podemos llevar a cabo el comportamiento deseado.

###### Apple:

La manzana podrá ser definida con sus coordenadas X e Y, el color, y el tamaño (igual al tamaño de la serpiente). Por lo que creamos una clase con estas propiedades.
Las coordenadas en las que se dibujará la manzana se generan aleatoriamente, pero antes se corrobora si estan en contacto con la serpiente o no (es decir, si la manzana al generarse aleatoriamente aparece sobre el cuerpo de la serpiente, se deberán definir otras coordenadas X e Y para que aparezca). Esto lo hacemos con un ciclo ```whi
le``` que compara las coordenadas generas aleatoriamente con las coordenadas de la serpiente, y sale del loop si no hay coincidencia entre ellas.



```
