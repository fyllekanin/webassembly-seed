
/**
 *  p = heap space to start at
 *  len = length of array
 */
void reverse (unsigned char* p, int len) {
    for (int i = 0; i < len / 2; ++i) {
        unsigned char temp = p[i];
        p[i] = p[len - i - 1];
        p[len - i - 1] = temp;
    }
}