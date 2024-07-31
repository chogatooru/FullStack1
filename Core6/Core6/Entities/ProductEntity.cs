﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Core6.Entities
{
	public class ProductEntity
	{
		[Key]
		public long Id { get; set; }
		public string Brand { get; set; }
		public string Title { get; set; }
		public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}

