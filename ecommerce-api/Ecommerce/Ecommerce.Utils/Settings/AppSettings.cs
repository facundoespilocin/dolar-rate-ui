namespace Ecommerce.Utils.Extensions
{
    public class AppSettings
    {
        public AppSettings()
        {
            Secret = "BandOfCodersSymmetricEncryptionKey";
        }

        public string Secret { get; set; }
    }
}