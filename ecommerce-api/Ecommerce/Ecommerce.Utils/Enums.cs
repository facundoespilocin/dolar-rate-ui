namespace Ecommerce.Utils
{
    public static class Enums
    {
        public enum TokenTypes
        {
            ConfirmToken = 1,
            ForgotToken = 2,
            InvitedToken = 3
        }

        public enum DataSourceTypes
        {
            Excel = 1,
            Connector = 2,
        }

        public enum StatusTypes
        {
            NotActive = 0,
            Active = 1,
            All = 2,
        }

        public enum DocumentTypes
        {
            DNI = 1,
            LCE = 2,
            Passport = 3,
        }

        public enum GenderTypes
        {
            Male = 1,
            Female = 2,
            Other = 3
        }
    }
}