using System.Net;
using System.Text;

namespace com.cinaq.MendixCLI.MendixExtension;

public static class HttpListenerResponseUtils
{
    public static async Task SendFileAndClose(this HttpListenerResponse response, string contentType, string filePath, CancellationToken ct)
    {
        response.AddDefaultHeaders(200);

        var fileContents = await File.ReadAllBytesAsync(filePath, ct);

        response.ContentType = contentType;
        response.ContentLength64 = fileContents.Length;

        await response.OutputStream.WriteAsync(fileContents, ct);

        response.Close();
    }

    public static void SendJsonAndClose(this HttpListenerResponse response, MemoryStream jsonStream)
    {
        response.AddDefaultHeaders(200);

        response.ContentType = "application/json";
        response.ContentEncoding = Encoding.UTF8;
        response.ContentLength64 = jsonStream.Length;

        jsonStream.WriteTo(response.OutputStream);

        response.Close();
    }

    public static void SendNoBodyAndClose(this HttpListenerResponse response, int statusCode)
    {
        response.AddDefaultHeaders(statusCode);

        response.Close();
    }

    static void AddDefaultHeaders(this HttpListenerResponse response, int statusCode)
    {
        response.StatusCode = statusCode;

        // Makes sure the web-code can receive responses
        response.AddHeader("Access-Control-Allow-Origin", "*");
    }
}