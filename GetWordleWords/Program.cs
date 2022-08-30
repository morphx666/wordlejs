using(HttpClient client = new()) {
    Task<string> data = client.GetStringAsync("https://wordletoday.org/wordle-words.php");
    string html = data.GetAwaiter().GetResult();

    List<string> words = new() { "const words = [" };
    int i = 0;
    while(true) {
        i = html.IndexOf("Wordle Words starting with", i);
        if(i == -1) break;

        i = html.IndexOf("<br", i);
        i = html.IndexOf(">", i) + 1;

        int j = html.IndexOf("<p", i);
        string[] tmp = html[i..j].Trim().Replace(" ", "").Replace("</p>", ",").Split(',');
        words.AddRange(tmp.Where(t => t != "").Select(t => $"\"{t}\","));
    }

    words.Add("]");
    File.WriteAllLines("../words-wordle.js", words);
}